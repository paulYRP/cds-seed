<script>
(function(){
  const pwd = "2TA!cK?#i2v#x%Y";
  if (sessionStorage.getItem("qut_unlock") === "1") return;
  const entered = prompt("Enter password to access this site:");
  if (entered !== pwd) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:20%'>Access Denied</h2>";
    throw new Error("Access Denied");
  }
  sessionStorage.setItem("qut_unlock", "1");
})();
</script>
