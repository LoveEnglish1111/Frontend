import signInImg from "../../public/SignIn.jpg"

export default function SignIn() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-primary">
            <div className="flex w-[900px] h-[500px] bg-white rounded-[10px]">
                <div className="w-[50%]">
                    <img src={signInImg} alt="HelloWorld" className="select-none w-full h-full object-contain"/>
                </div>
                <div className="w-[50%] h-full p-[20px]">
                    <h1 className="font-bold text-[40px] text-center">SIGN IN</h1>
                    <form action="" className="w-full">
                        <input type="text" className="text-[20px] outline-none w-[95%] bg-gray-100 p-[20px] mt-[20px] rounded-[15px]" placeholder="Username"/>
                        <br />
                        <input type="password" className="text-[20px] outline-none w-[95%] bg-gray-100 p-[20px] mt-[20px] rounded-[15px]" placeholder="Password"/>
                        <br />
                        <div className="relative">
                            <input type="checkbox" id="rememberMeBox" className="mt-[20px] mr-[5px]"/>
                            <label for="rememberMeBox">Remember Me?</label>
                            <a href="" className="absolute right-[20px] top-[50%]">Forget password?</a>
                        </div>
                        <button className="w-[95%] p-[15px] font-bold text-[white] bg-primary text-center mt-[20px] rounded-[20px] cursor-pointer">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}