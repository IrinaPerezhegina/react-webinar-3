
export default function dateСonverter(data) {

  const date = new Date(data);

  return (
    date
      .toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .replace(/\s*г\./, "") +
    ` в ${
      date.getHours().toString().length < 2
        ? "0" + date.getHours()
        : date.getHours()
    }:${
      date.getMinutes().toString().length < 2
        ? "0" + date.getMinutes()
        : date.getMinutes()
    }`
  );
}
