const menuToggle = document.getElementById("menu-toggle");
const menuItems = document.getElementById("menu-items");
const nav = document.getElementsByTagName("nav")[0];

menuToggle.addEventListener("click", function ()
{
  if (menuItems.classList.contains("hidden"))
  {
    menuItems.classList.remove("hidden");
    menuItems.classList.add("absolute", "bg-blue-900", "w-full", "py-2");
    menuItems.style.top = `${ nav.offsetHeight + nav.offsetTop }px`;
    menuItems.style.left = 0;
  } else
  {
    menuItems.classList.add("hidden");
    menuItems.classList.remove("absolute", "bg-blue-900", "w-full", "py-2");
  }
});


