import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export default function Referral() {
  const { user } = useContext(AuthContext);
  const referralLink = user ? `https://mindreset.app/?ref=${user.id}` : '';

  return (
    <div className="...">
      {user ? (
        <>
          <h1>Invite Friends & Earn Premium</h1>
          <div className="flex items-center ...">
            <span>{referralLink}</span>
            <button onClick={() => navigator.clipboard.writeText(referralLink)}>
              Copy
            </button>
          </div>
        </>
      ) : (
        <p>Please log in to access referral link.</p>
      )}
    </div>
  );
}

