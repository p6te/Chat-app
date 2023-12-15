interface Size {
  mobile: string;
}

const size: Size = {
  mobile: "600px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
};
