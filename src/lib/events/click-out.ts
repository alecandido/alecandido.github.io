export default function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent('outclick'));
      event.stopPropagation();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
