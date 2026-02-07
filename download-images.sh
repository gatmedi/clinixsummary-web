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
echo "Done! Social icons saved to images/"
echo "Note: Brand images (logos, hero) are already included in the repo."
