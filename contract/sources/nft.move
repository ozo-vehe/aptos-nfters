module my_addrx::NFT {
  use std::string::utf8;
  use std::debug::print;

  fun new_fun() {
    print(&utf8(b"Hello there"))
  }
}