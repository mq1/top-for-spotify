import html2canvas from "html2canvas";


const share = async (id: string) => {
    const canvas = await html2canvas(document.getElementById(id)!);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const blob = await fetch(dataUrl).then((r) => r.blob());
    const files = [new File([blob!], `${id}.jpeg`, { type: "image/jpeg" })];

    if (navigator.canShare && navigator.canShare({ files })) {
        navigator.share({
            files,
            title: `My ${id}`,
            text: `My ${id}`,
        });
    } else {
        let link = document.createElement('a');
        link.download = `${id}.png`;
        link.href = dataUrl;
        link.click();
    }
};

export default share;
