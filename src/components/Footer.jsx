// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800 mt-10">
      <p>© {new Date().getFullYear()} BMCKSAPPS LLC. All rights reserved.</p>
      <p>
        Contact: <a href="mailto:bmcksapps@gmail.com" className="underline">bmcksapps@gmail.com</a>
      </p>
      <p>
        <a href="/stripe" className="underline">AI Writer Pro Checkout</a>
      </p>
    </footer>
  );
}
