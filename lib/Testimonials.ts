export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  project?: string; // e.g. "Maan Travels"
};

// Add REAL client quotes here, with their permission. While this list is empty,
// the "What clients say" section renders nothing, so the page never shows a blank block.
//
// Example shape:
// {
//   quote: "…",
//   name: "Full Name",
//   role: "Owner",
//   company: "Company",
//   project: "Maan Travels",
// },
export const TESTIMONIALS: Testimonial[] = [];
