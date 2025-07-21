import { useState } from "react";
import EmailGate from "../components/EmailGate";
import StripePaywall from "../components/StripePaywall";

export default function Access() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  return (
    <div className="pt-28 px-4 min-h-screen bg-[#0d1117]">
      {!emailSubmitted ? (
        <EmailGate onUnlock={() => setEmailSubmitted(true)} />
      ) : (
        <StripePaywall />
      )}
    </div>
  );
}
