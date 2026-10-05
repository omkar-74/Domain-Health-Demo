export const theme = {
  bg: "#ffffff",
  surface: "#f4f8fb",
  ink: "#1c2a39",
  value: "#3b4a5a",
  muted: "#6a7886",
  line: "#e6ebf0",
  brand: "rgb(3, 71, 114)",
  focus: "#034772",
  icon: "#7db8ee",
  yes: "#3fa564",
  no: "#f0457a",
  grade: {
    A: { fg: "#13744a", bg: "#e6f5ed" },
    B: { fg: "#4d7a12", bg: "#eef6dc" },
    C: { fg: "#a86a00", bg: "#fdf1d6" },
    D: { fg: "#b8500f", bg: "#fde9da" },
    F: { fg: "#b42323", bg: "#fbe3e3" },
    none: { fg: "#5b6877", bg: "#eceff3" },
  },
};

export const gradeTone = (g) => theme.grade[g] || theme.grade.none;

export const percentTone = (p) => {
  if (p == null) return theme.grade.none;
  if (p >= 90) return theme.grade.A;
  if (p >= 75) return theme.grade.B;
  if (p >= 60) return theme.grade.C;
  if (p >= 45) return theme.grade.D;
  return theme.grade.F;
};
