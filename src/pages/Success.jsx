import { useEffect } from 'react';
import { supabase } from '../supabase';

export default function Success() {
  useEffect(() => {
    const upgradeFallback = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('id', user.id);
    };

    upgradeFallback();
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-500">You're Premium! 🎉</h1>
      <p className="text-gray-300 mt-2">Enjoy your unlocked AI features.</p>
    </div>
  );
}
