
import { QRCodeCanvas } from "qrcode.react";

export default function PaymentQR() {
  // Replace with your actual payment link (UPI, PayPal, Stripe, etc.)
  const paymentLink = "upi://pay?pa=8553476211@ybl&pn=LuminaAI(DrishtiAI)&cu=INR";

  return (
        <QRCodeCanvas
          value={paymentLink}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
  );
}
