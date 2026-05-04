import "../globals.css";
export default function FlightSearch() {
  return (
    <div className="List2">
      <div className="Form">
        <div className="Bottom">
          <div className="LocationPicker">
            <input type="text" placeholder=" مبدا" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 91 91"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className="st0"
                  d="M8.4,31.9c4-0.8..."
                />
                <path
                  className="st0"
                  d="M80.8,58.4c-3.6,0.8..."
                />
              </g>
            </svg>
            <input type="text" placeholder=" مقصد" />
          </div>

          <div className="DatePicker">
            <input type="text" placeholder="تاریخ رفت" />
            <input type="text" placeholder="تاریخ برگشت" />
          </div>

          <div className="PaxPicker">
            <input type="text" placeholder="تعداد مسافرین" />
          </div>

          <div className="Submit">
            <button>جستجو</button>
          </div>
        </div>
      </div>
    </div>
  );
}
