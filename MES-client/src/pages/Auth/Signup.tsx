interface SignUpFormProps {
    onToggle: () => void;
  }
  
  export default function SignUp({ onToggle }: SignUpFormProps) {
    return (
      <div className="flex flex-col items-center space-y-4 w-full">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border rounded-md" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" />
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Create Account
        </button>
        <p className="text-sm">
          Already have an account?{" "}
          <button className="text-green-500 underline" onClick={onToggle}>
            Sign In
          </button>
        </p>
      </div>
    );
  }
  