import "../globals.css";
export default function FlightSearch() {
  return (
    <div className="List2">
      <div className="Form">
        <div className="Bottom">
          <div className="LocationPicker">
            <input type="text" placeholder="تهران" />
          </div>

          <div className="DatePicker">
            <input type="text" placeholder="تاریخ رفت" />
            <input type="text" placeholder="تاریخ برگشت" />
          </div>

          <div className="Submit">
            <button>جستجو</button>
          </div>
        </div>
      </div>
    </div>
  );
}
