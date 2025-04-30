interface SignInFormProps {
    onToggle: () => void;
  }
  
  export default function SignInForm({ onToggle }: SignInFormProps) {
    return (
      <div className="flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm">
          Don't have an account?{" "}
          <button className="text-blue-500 underline" onClick={onToggle}>
            Sign Up
          </button>
        </p>
      </div>
    );
  }
  