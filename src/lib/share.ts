import html2canvas from "html2canvas";

const share = async (id: string) => {
    const canvas = await html2canvas(document.getElementById(id)!);
    const dataUrl = canvas.toDataURL();

    let link = document.createElement("a");
    link.href = dataUrl;
    link.click();
};

export default share;
