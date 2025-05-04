import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId } = await req.json();

    // Fetch leave application details
    const { data: application, error: applicationError } = await supabase
      .from("leave_applications")
      .select(`
        *,
        employee:employees(*),
        leave_type:leave_types(*)
      `)
      .eq("id", applicationId)
      .single();

    if (applicationError) throw applicationError;

    // Send email notification
    const { data: emailResponse, error: emailError } = await resend.emails.send({
      from: "ZA Payroll <onboarding@resend.dev>",
      to: ["manager@company.com"], // Replace with actual manager email
      subject: `Leave Request from ${application.employee.first_name} ${application.employee.last_name}`,
      html: `
        <h1>New Leave Request</h1>
        <p>Employee: ${application.employee.first_name} ${application.employee.last_name}</p>
        <p>Leave Type: ${application.leave_type.name}</p>
        <p>From: ${application.start_date}</p>
        <p>To: ${application.end_date}</p>
        <p>Reason: ${application.reason || 'No reason provided'}</p>
      `,
    });

    if (emailError) throw emailError;

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
