import signInImg from "../../public/SignIn.jpg"

export default function SignIn() {
    return (
        <div>
            <div className="l-form">
                <form action="" className="form">
                    <h1 className="form__title">Sign In</h1>

                    <div className="form__div">
                        {/* <input type="text" className="form__input" placeholder=" "> */}
                        <input type="text" placeholder=" "/>
                        <label for="" className="">Email</label>
                    </div>

                    <div className="form__div">
                        {/* <input type="password" className="form__input" placeholder=" "> */}
                        <label for="" className="">Password</label>
                    </div>
                    <input type="submit" placeholder=" "/>
                </form>
            </div>
        </div>
    );
}