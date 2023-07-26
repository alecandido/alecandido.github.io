{ pkgs, ... }:

{
  languages.javascript = {
   enable = true;
   corepack.enable = true;
  };
}
