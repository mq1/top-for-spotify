import html2canvas from "html2canvas";

const share = async (id: string) => {
    const canvas = await html2canvas(document.getElementById(id)!);
    const dataUrl = canvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const image = new File([blob], `${id}.png`, { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [image] })) {
        await navigator.share({
            files: [image],
            title: id,
        });
    } else {
        let link = document.createElement("a");
        link.download = `${id}.png`;
        link.href = dataUrl;
        link.click();
    }
};

export default share;
