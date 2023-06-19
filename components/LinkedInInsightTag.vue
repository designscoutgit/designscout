<script>
export default {
  mounted() {
    // Add the LinkedIn Insight Tag script dynamically to the page
    const script = document.createElement("script");
    script.text = `
          _linkedin_partner_id = '4956716';
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `;
    document.head.appendChild(script);
    // Trigger the LinkedIn Insight Tag conversion event
    const img = new Image(1, 1);
    img.src = "https://px.ads.linkedin.com/collect/?pid=4956716&fmt=gif";
    img.style.display = "none";
    document.body.appendChild(img);
  },
};
</script>
  