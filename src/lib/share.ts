import html2canvas from "html2canvas";


const share = async (id: string) => {
    const canvas = await html2canvas(document.getElementById(id)!);

    if (!navigator.canShare) {
        const dataUrl = canvas.toDataURL("image/png");
        let link = document.createElement('a');
        link.download = `${id}.png`;
        link.href = dataUrl;
        link.click();
    } else {
        canvas.toBlob(async (blob) => {
            const files = [new File([blob!], `${id}.png`, { type: blob!.type })];

            navigator.share({
                files: files,
                title: `My ${id}`,
                text: `My ${id}`,
            });
        })
    }
};

export default share;
