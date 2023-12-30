interface Size {
  mobile: string;
  tablet: string;
}

const size: Size = {
  mobile: "500px",
  tablet: "820px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
};
