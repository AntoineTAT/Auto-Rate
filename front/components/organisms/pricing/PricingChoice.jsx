import PricingCase from "../../molecules/pricing/PricingCase";

function PricingChoice() {
    return (
        <div className="flex justify-evenly pt-60">

            <div>
                <PricingCase redirect="basics" choice="Basics" text="Basics" options="Rate your car thanks to our algorithm at the nearest market prices."/>
            </div>
            
            <div>
                <PricingCase redirect="premium" choice="Premium" text="Premium" options="The premium formula include a precise date pricing in addition to the basics one."/>
            </div>

        </div>
    )
}

export default PricingChoice
