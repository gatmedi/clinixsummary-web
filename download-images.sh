#!/bin/bash
# Download third-party social login icons for ClinixSummary website
# All brand images are already included in images/
# Run this from the project root: ./download-images.sh

echo "Downloading third-party social login icons..."

# Google sign-in icon
curl -sL "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" -o images/google-logo.svg
echo "  ✓ google-logo.svg"

# Microsoft sign-in icon
curl -sL "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" -o images/microsoft-logo.svg
echo "  ✓ microsoft-logo.svg"

# Apple sign-in icon
curl -sL "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" -o images/apple-logo.svg
echo "  ✓ apple-logo.svg"

echo ""
echo "Sub-processor logos (custom SVGs, included in repo):"
echo "  ✓ sp-openai.svg    — OpenAI (hex knot logo, white on #202123)"
echo "  ✓ sp-elevenlabs.svg — ElevenLabs (II bars, white on black)"
echo "  ✓ sp-google.svg    — Google (copied from google-logo.svg)"
echo "  ✓ sp-azure.svg     — Microsoft Azure (copied from microsoft-logo.svg)"
echo "  ✓ sp-stripe.svg    — Stripe (S mark, white on #635BFF)"
echo "  ✓ sp-postmark.svg  — Postmark (P lettermark, black on #FFDE00)"
echo "  ✓ sp-apple.svg     — Apple (copied from apple-logo.svg)"
echo "  ✓ sp-gplay.svg     — Google Play (copied from google-logo.svg)"
echo "  ✓ sp-sectigo.svg   — Sectigo (shield+check, white on #3CA862)"
echo "  ✓ sp-dmarc.svg     — DMARC Digests (envelope+check, white on #1a73e8)"
echo ""
echo "Done! Social icons saved to images/"
echo "Note: Brand images (logos, hero) and sub-processor logos are already included in the repo."
