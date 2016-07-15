module Material.Select exposing (..)

import Html exposing (Html, text)
import Parts exposing (Indexed)

import Material.Button as Button
import Material.Helpers as Helpers exposing (pure, delay, fx)
import Material.Options as Options exposing (cs, css, nop, styled, styled', div, span)

import Material.Select.Geometry as Geometry exposing (Geometry)
import Material.Select.Menu as Menu
import Material.Select.Textfield as Textfield


-- OPTIONS


type alias Config =
  { selected : Int
  }


defaultConfig : Config
defaultConfig =
  { selected = 0
  }


type alias Property m =
  Options.Property Config m


selected : Int -> Property m
selected index =
  Options.set (\config -> { config | selected = index })


-- MODEL


type alias Model =
  { value : String
  , expanded : Bool
  , geometry : Maybe Geometry
  , index : Maybe Int
  }


defaultModel : Model
defaultModel =
  { value = ""
  , expanded = False
  , geometry = Nothing
  , index = Nothing
  }


type Msg
  = NoOp
  | TextfieldMsg Textfield.Msg
  | MenuMsg Menu.Msg
  | Close
  | Key Int Int


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of

    TextfieldMsg (Textfield.Focus geometry) ->
      pure
      { model
        | expanded = True
        , geometry = Just geometry
      }

    TextfieldMsg Textfield.Blur ->
      model ! [ delay 100 Close ]

    Close ->
      pure { model | expanded = False, geometry = Nothing }

    TextfieldMsg _ ->
      pure model

    MenuMsg (Menu.Select index geometry) ->
      pure
      { model
        | expanded = False
        , geometry = Nothing
        , index = Just index
        , value = toString index
      }

    MenuMsg _ ->
      pure model

    NoOp ->
      pure model

    Key numItems 13 ->
      model
      !
      [ fx << MenuMsg <|
        Menu.Select
          (model.index |> Maybe.withDefault 1)
          (model.geometry |> Maybe.withDefault Geometry.defaultGeometry)
      ]

    Key numItems 38 ->
      pure
      { model
        | index =
          model.index
          |> Maybe.withDefault 0
          |> (flip (-) 1 >> Basics.max 1 >> Just)
      }

    Key numItems 40 ->
      pure
      { model
        | index =
          model.index
          |> Maybe.withDefault 0
          |> ((+) 1 >> Basics.min numItems >> Just)
      }

    Key _ _ ->
      pure model


-- VIEW


view' : (Msg -> m) -> Model -> List (Property m) -> List String -> Html m
view' lift model options choices =
  let
    textfieldModel =
      Textfield.defaultModel

    menuModel =
      let
        defaultModel = Menu.defaultModel
      in
        { defaultModel
          | animationState =
              if model.expanded then Menu.Opened else Menu.Idle
          , geometry = model.geometry
        }

    buttonModel =
      Button.defaultModel

    ({config} as summary) = Options.collect defaultConfig options
  in
    Options.apply summary Html.div
    [ cs "mdl-select"
    , css "position" "relative"
    , css "width" "300px"
    ]
    [
    ]
    [ div
      [ cs "mdl-select__textfield"
      ]
      [ Textfield.view' (lift << TextfieldMsg) textfieldModel
        [ Textfield.value <|
          case model.index of
            Just index ->
              case List.head (List.drop (index - 1) choices) of
                Just value -> value
                Nothing -> ""
            Nothing -> ""
        , Textfield.onKeyDown (\numItems index -> lift (Key numItems index))
        ]
      ]
    , div
      [ cs "mdl-select__menu"
      , css "position" "absolute"
      , css "top" "20px"
      , css "right" "0"
      , css "padding" "1px 0"
      ]
      [ Menu.view' (lift << MenuMsg) menuModel []
        ( choices
          |> List.indexedMap
             ( \index value ->
               Menu.Item False True (Just (index + 1) == model.index)
               ( span [ css "pointer-events" "none" ] [ text value ] )
             )
        )
      ]
    ]


view : Model -> List (Property Msg) -> List String -> Html Msg
view = view' identity


-- PARTS

type alias Container c =
  { c | selects : Indexed Model }


render
  : (Parts.Msg (Container c) -> m)
  -> Parts.Index
  -> Parts.View (Container c) (List (Property m) -> List String -> Html m)
render =
  Parts.create view' update .selects (\x y -> {y | selects=x}) defaultModel
