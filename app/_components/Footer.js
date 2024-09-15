function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center absolute right-0 left-0 bottom-0 text-sm xl:text-base">
      &copy; Copyright {year},{" "}
      <a href="https://grifonekio.site/" target="_blank">
        Max Demel
      </a>
    </div>
  );
}

export default Footer;
