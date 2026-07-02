"use server";

export interface BookingState {
  success: boolean;
  message: string;
  bookingId?: string;
}

export interface CancelBookingState {
  success: boolean;
  message: string;
}

export async function createBooking(
  _prevState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const type = formData.get("type") as string; // "flight" | "hotel" | "tour"
  const itemId = formData.get("itemId") as string;
  const passengerName = formData.get("passengerName") as string;
  const passengerPhone = formData.get("passengerPhone") as string;
  const date = formData.get("date") as string;
  const passengers = formData.get("passengers") as string;

  if (!type) {
    return { success: false, message: "نوع رزرو الزامی است" };
  }

  if (!itemId) {
    return { success: false, message: "شناسه آیتم رزرو الزامی است" };
  }

  if (!passengerName) {
    return { success: false, message: "نام مسافر الزامی است" };
  }

  if (!passengerPhone) {
    return { success: false, message: "شماره تماس مسافر الزامی است" };
  }

  const prefix =
    type === "flight" ? "FL" : type === "hotel" ? "HT" : "TR";
  const bookingId = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

  // Mock: in production, save to database
  return {
    success: true,
    message: `رزرو ${bookingId} با موفقیت ثبت شد`,
    bookingId,
  };
}

export async function cancelBooking(
  _prevState: CancelBookingState,
  formData: FormData,
): Promise<CancelBookingState> {
  const bookingId = formData.get("bookingId") as string;

  if (!bookingId) {
    return { success: false, message: "شماره رزرو الزامی است" };
  }

  // Mock: in production, update database
  return {
    success: true,
    message: `رزرو ${bookingId} با موفقیت لغو شد`,
  };
}
