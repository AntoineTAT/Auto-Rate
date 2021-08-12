import BlueButton from "../button/BlueButton";

function PricingCaseStyle({title, options, redirect}) {
    return (
        <div className="bg-white shadow-md rounded h-40 w-full mx-10">
            <p className="text-black text-center font-bold pt-3">
                {title}
            </p>

            <p className="text-black text-center pt-5">
            {options}
            </p>

            <div className="pt-5" >
                <BlueButton title={title} redirect={redirect}/>
            </div>
            
        </div>
    )
}

export default PricingCaseStyle
