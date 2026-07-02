import Image from "next/image";
import "../globals.css";

interface HeaderMakeYourTourProps {
  currentStep?: number;
}

function HeaderMakeYourTour({ currentStep = 1 }: HeaderMakeYourTourProps) {
  return (
    <>
      <header>
        <div className="HeaderTop2">
          <div className="Container">
            <a href="/index" className="Logo">
              <Image src="/Media/لوگو حمید پرواز (2).png" alt="Niksa Logo" width={48} height={48} priority />
            </a>

            <div className="AuthButtons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 2.5a5.25 5.25 0 0 0-2.519 9.857 9.005 9.005 0 0 0-6.477 8.37.75.75 0 0 0 .727.773H20.27a.75.75 0 0 0 .727-.772 9.005 9.005 0 0 0-6.477-8.37A5.25 5.25 0 0 0 12 2.5Z"></path>
              </svg>
              <p>UserName</p>
            </div>
          </div>
        </div>
      </header>

      <div className="Hero4">
        <div className="HeroContent">
          <div className="stepper">
            {/* STEP 1 */}
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <i className="fa-solid fa-check"></i>
              <span>انتخاب هتل</span>
            </div>

            <div className={`line ${currentStep > 1 ? "active" : ""}`} />

            {/* STEP 2 */}
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <i className="fa-solid fa-user-group"></i>
              <span>انتخاب اتاق</span>
            </div>

            <div className={`line ${currentStep > 2 ? "active" : ""}`} />

            {/* STEP 3 */}
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              <i className="fa-solid fa-filter"></i>
              <span>انتخاب پرواز</span>
            </div>

            <div className={`line ${currentStep > 3 ? "active" : ""}`} />

            {/* STEP 4 */}
            <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>اطلاعات مسافر</span>
            </div>
            <div className={`line ${currentStep > 4 ? "active" : ""}`} />

            {/* STEP 5 */}
            <div className={`step ${currentStep >= 5 ? "active" : ""}`}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>تایید اطلاعات و پرداخت</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderMakeYourTour;
