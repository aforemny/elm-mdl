rec {

  pkgs = import /nix/var/nix/profiles/per-user/root/channels/nixos-unstable {};

  elm-compiler = pkgs.elmPackages.elm-compiler;
  elm-make     = pkgs.elmPackages.elm-make;
  elm-package  = pkgs.elmPackages.elm-package;

  env = pkgs.buildEnv {
    name  = "elm-mdl";
    paths =
      [ elm-compiler elm-make elm-package pkgs.lessc
      ];
  };

}
