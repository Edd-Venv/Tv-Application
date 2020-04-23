const handleToolTip = (tooltipId, inputId, formId) => {
  if (!document.getElementById(tooltipId)) {
    const toolTip = document.createElement("p");
    toolTip.id = tooltipId;

    if (document.getElementById(inputId)) {
      document.getElementById(formId).appendChild(toolTip);
      const hostElement = document.getElementById(inputId);
      const hostElPosLeft = hostElement.offsetLeft;
      const hostElPosTop = hostElement.offsetTop;
      const hostElHeight = hostElement.clientHeight;

      const x = hostElPosLeft;
      const y = hostElPosTop + hostElHeight + 5;
      toolTip.className = "pop-up";
      toolTip.style.position = "absolute";
      toolTip.style.left = x + "px";
      toolTip.style.top = y + "px";
    }
  }
};
export default handleToolTip;
