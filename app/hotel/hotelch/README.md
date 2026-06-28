# Hotel feature implementation changes

## Changes Made

1. **Created HotelList.tsx component** at `app/components/HotelList.tsx`
   - Displays a list of hotels/tour cards from toursDB
   - Each hotel card is clickable and navigate to `/hotel/hotelch`
   - Includes a "دیدن جزئیات هتل" button that has expandable content
   - The button is NOT clickable (just toggles content visibility)
   - Uses toursDB from `../data/tours.ts` for hotel data

2. **Updated hotelch/page.tsx** at `app/hotel/hotelch/page.tsx`
   - Removed the duplicate TourDetailFull component (which belonged to tour page)
   - Changed to import HotelList component
   - Now properly displays the hotel list with clickable hotel cards
   - The "دیدن جزئیات هتل" button shows the special modal content

## Key Features

✅ **Clickable hotel cards**: All hotel cards navigate to `/hotel/hotelch`
✅ **Non-clickable "دیدن جزئیات هتل" button**: Has expandable content but doesn't navigate
✅ **Content for "دیدن جزئیات هتل" button**: Shows a modal with the detailed content
✅ **Uses /hotel/hotelch for the hotel UI** as requested

## Usage

When a user clicks on a hotel card in the list, they will be navigated to `/hotel/hotelch` where they'll see the hotel list with:
- All hotel cards clickable and navigating to the same page
- A "دیدن جزئیات هتل" button with its own modal content
- No navigation conflicts between the two types of interactions