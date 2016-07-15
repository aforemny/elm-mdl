module Material.Select.Menu exposing
  ( Model, defaultModel, AnimationState(..)
  , Item
  , Msg(..), update
  , view', view
  , Property
  , ripple
  , render
  )

{-| From the [Material Design Lite documentation](http://www.getmdl.io/components/#menus-section):

> The Material Design Lite (MDL) menu component is a user interface element
> that allows users to select one of a number of options. The selection
> typically results in an action initiation, a setting change, or other
> observable effect. Menu options are always presented in sets of two or
> more, and options may be programmatically enabled or disabled as required.
> The menu appears when the user is asked to choose among a series of
> options, and is usually dismissed after the choice is made.

> Menus are an established but non-standardized feature in user interfaces,
> and allow users to make choices that direct the activity, progress, or
> characteristics of software. Their design and use is an important factor in
> the overall user experience. See the menu component's Material Design
> specifications page for details.

See also the
[Material Design Specification]([https://www.google.com/design/spec/components/menus.html).

Refer to
[this site](https://debois.github.io/elm-mdl/#/menus)
for a live demo.

# Render
@docs Item, render

# Options
@docs Property

## Appearance
@docs ripple

# Elm architecture
@docs Model, defaultModel, Msg, update, view


-}


import Array exposing (Array)
import Dict exposing (Dict)
import Platform.Cmd exposing (Cmd, none)
import Html.Attributes exposing (..)
import Html.Events as Html exposing (defaultOptions)
import Html exposing (..)
import Json.Decode as Json exposing (Decoder)
import Json.Encode exposing (string)
import Material.Helpers as Helpers exposing (cssTransitionStep)
import String
import Html.App

import Material.Select.Geometry as Geometry exposing (Geometry)
import Material.Ripple as Ripple
import Material.Options as Options exposing (Style, cs, css, styled, styled')
import Material.Icon as Icon
import Material.Helpers as Helpers
import Parts exposing (Indexed, Index)


-- CONSTANTS


constant :
  { transitionDurationSeconds  : Float
  , transitionDurationFraction : Float
  , closeTimeout               : Float
  }
constant =
  { transitionDurationSeconds  = 0.3
  , transitionDurationFraction = 0.8
  , closeTimeout               = 150
  }


-- MODEL


{-| TODO.
-}
type alias Model =
  { items : Dict Int Ripple.Model
  , animationState : AnimationState
  , geometry : Maybe Geometry
  }


type AnimationState
  = Idle
  | Opening
  | Opened
  | Closing


{-| TODO.
-}
defaultModel : Model
defaultModel =
  { items = Dict.empty
  , animationState = Idle
  , geometry = Nothing
  }


-- ITEM


{-| Item model.
-}
type alias Item m =
  { divider : Bool
  , enabled : Bool
  , selected : Bool
  , html : Html m
  }


-- ACTION, UPDATE


{-| Component action.
-}
type Msg
  = Open Geometry
  | Select Int Geometry
  | Close Geometry
  | Tick
  | Ripple Int Ripple.Msg


{-| Component update.
-}
update : Msg -> Model -> (Model, Cmd Msg)
update action model =

  case action of
    Open geometry ->
      ( { model
        | animationState =
            case model.animationState of
              Opened  -> Opened
              _       -> Opening
        , geometry = Just geometry
        }
      , cssTransitionStep Tick
      )

    Tick ->
      ( { model | animationState = Opened }
      , Cmd.none
      )

    Close geometry ->
      ( { model
        | animationState = Idle
        , geometry = Nothing
        }
      , Cmd.none
      )

    Select idx geometry ->
      -- Close the menu after some delay for the ripple effect to show.
      ( { model | animationState = Closing }
      , Helpers.delay constant.closeTimeout (Close geometry)
      )

    Ripple idx action ->
      let
        (model', effects) =
          Dict.get idx model.items
           |> Maybe.withDefault Ripple.model
           |> Ripple.update action
      in
        ( { model | items = Dict.insert idx model' model.items }
        , Cmd.map (Ripple idx) effects
        )


-- PROPERTIES


type alias Config =
  { ripple : Bool
  }


defaultConfig : Config
defaultConfig =
  { ripple = False
  }


{-|
  TODO
-}
type alias Property m =
  Options.Property Config m


{-|
-}
ripple : Property m
ripple =
  Options.set (\config -> { config | ripple = True })


-- VIEW



{-| Component view.
-}


containerGeometry : Config -> Geometry -> List (Property m)
containerGeometry config geometry =
  [ css "width" <| toPx geometry.menu.bounds.width
  , css "height" <| toPx geometry.menu.bounds.height
  , css "top" <| toPx (geometry.button.offsetTop + geometry.button.offsetHeight)
  , let
      right e = e.bounds.left + e.bounds.width
    in
      css "right" <| toPx (right geometry.container - right geometry.menu)
  ]


outlineGeometry : Config -> Geometry -> List (Style m)
outlineGeometry config geometry =
  []


{-| TODO
-}
view : Model -> List (Property Msg) -> List (Item Msg) -> Html Msg
view =
  view' identity


view' : (Msg -> m) -> Model -> List (Property m) -> List (Item m) -> Html m
view' lift model properties items =
  let
    summary = Options.collect defaultConfig properties
    config = summary.config
  in
    styled div
      [
      ]
      [ Icon.view "expand_more"
        [ css "pointer-events" "none"
        ]
      , styled div
        [ cs "mdl-menu__container"
        , cs "is-upgraded"
        , cs' "is-visible"
            ((model.animationState == Opened) || (model.animationState == Closing))
        , model.geometry
            |> Maybe.map (containerGeometry config >> Options.many)
            |> Maybe.withDefault (Options.nop)
        , css "pointer-events" "auto"
        , css "margin-top" "-25px"
        ]
        [ styled div
          [ cs "mdl-menu__outline"
          , model.geometry
              |> Maybe.map (\geometry ->
                  [ css "width" <| toPx (geometry.menu.bounds.width)
                  , css "height" <| toPx (geometry.menu.bounds.height)
                  ])
              |> Maybe.withDefault []
              |> Options.many
          , cs "mdl-menu--bottom-right"
          ]
          []
        , styled ul
            [ cs "mdl-menu"
            , cs "mdl-js-menu"
            , cs "mdl-menu--bottom-right"
            , cs' "is-animating"
                ((model.animationState == Opening)
                || (model.animationState == Closing))
            , model.geometry
                |> Maybe.map (\geometry ->
                   let
                     width  = geometry.menu.bounds.width
                     height = geometry.menu.bounds.height
                   in
                     (if (model.animationState == Opened)
                       || (model.animationState == Closing)
                     then
                         rect 0 width height 0
                     else
                         rect 0 width 0 width
                     ) |> css "clip"
                   )
                |> Maybe.withDefault Options.nop
            ]
            (List.map2 (makeItem lift config model) [1..List.length items] items)
        ]
      ]


makeItem : (Msg -> m) -> Config -> Model -> Int -> Item m -> Html m
makeItem lift config model n item =
  let
    transitionDuration =
      constant.transitionDurationSeconds *
      constant.transitionDurationFraction

    offsetTop n =
      model.geometry
        |> flip Maybe.andThen (.offsetTops >> Array.get (n-1)) -- n is 1-based
        |> Maybe.withDefault 0

    offsetHeight n =
      model.geometry
        |> flip Maybe.andThen (.offsetHeights >> Array.get (n-1)) -- n is 1-based
        |> Maybe.withDefault 0

    height =
      model.geometry
        |> Maybe.map (\geometry -> geometry.menu.bounds.height)
        |> Maybe.withDefault 0

    itemDelay =
      ((offsetTop n) / height * transitionDuration)
      |> toString
      |> flip (++) "s"
  in
    styled' li
      [ cs "mdl-menu__item"
      , css' "transition-delay" itemDelay
          ((model.animationState == Opening) || (model.animationState == Opened))
      , cs' "mdl-js-ripple-effect" config.ripple
      , cs' "mdl-menu__item--full-bleed-divider" item.divider
      , css' "background-color" "rgb(238,238,238)" item.selected
      ]
      [ if item.enabled then
           onClick Geometry.decodeAsMenuItem (Select n >> lift)
         else
           Html.Attributes.attribute "disabled" "disabled"
      , Html.Attributes.property "tabindex" (string "-1")
      {- TODO: No way to map an attribute?
      , Ripple.downOn "mousedown"
      , Ripple.downOn "touchstart"
      , Ripple.upOn "mouseup"
      , Ripple.upOn "mouseleave"
      , Ripple.upOn "touchend"
      , Ripple.upOn "blur"
      -}
      ]
      ( if config.ripple then
          [ item.html
          , Ripple.view
            [ Html.Attributes.class "mdl-menu__item-ripple-container" ]
            ( Dict.get n model.items
              |> Maybe.withDefault Ripple.model)
            |> Html.App.map (Ripple n >> lift)
          ]
        else
          [ item.html ]
      )


-- COMPONENT


type alias Container c =
  { c | menu : Indexed Model }


{-| Component render. Below is an example, assuming boilerplate setup as
indicated in `Material`, and a user message `Select String`.

    item : String -> Html Msg
    item str =
      Html.div
        [ Html.Events.onClick (Select str) ]
        [ Html.text str ]

    Menu.render Mdl [idx] model.mdl
      [ Menu.topLeft
      , Menu.ripple
      ]
      [ Menu.Item False True  <| item "Some item"
      , Menu.Item True  True  <| item "Another item"
      , Menu.Item False False <| item "Disabled item"
      , Menu.Item False True  <| item "Yet another item"
      ]
-}
render
  : (Parts.Msg (Container c) -> m)
  -> Parts.Index
  -> Container c
  -> List (Property m)
  -> List (Item m)
  -> (Html m)
render =
  Parts.create view' update .menu (\x y -> {y | menu=x}) defaultModel


-- HELPERS


onClick : Decoder Geometry -> (Geometry -> m) -> (Attribute m)
onClick decoder action =
  Html.onWithOptions "click" defaultOptions (Json.map action decoder)


rect : Float -> Float -> Float -> Float -> String
rect x y w h =
 [x,y,w,h]
 |> List.map toPx
 |> String.join " "
 |> (\coords -> "rect(" ++ coords ++ ")")


toPx : Float -> String
toPx = toString >> flip (++) "px"


cs' : String -> Bool -> Options.Property a b
cs' c p =
  if p then cs c else Options.nop


css' : String -> String -> Bool -> Options.Property a b
css' k v p =
  if p then css k v else Options.nop

