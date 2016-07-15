module Material.Select.Geometry exposing
  ( Geometry, Element
  , defaultGeometry, defaultElement
  , decode
  , decodeAsTextfield
  , decodeAsMenuItem
  , decodeAsMenuButton
  )

import Array exposing (Array)
import DOM
import Json.Decode exposing (..)


-- GEOMETRY


{-| An Geometry stores relevant information from DOM during Open and Close
events. (This computes more than it needs to.)
-}
type alias Geometry =
  { button : Element
  , container : Element
  , menu : Element
  , offsetTops : Array Float
  , offsetHeights : Array Float
  }


defaultGeometry =
  { button = defaultElement
  , container = defaultElement
  , menu = defaultElement
  , offsetTops = Array.fromList []
  , offsetHeights = Array.fromList []
  }


{-| Decode `Geometry` from root node's reference.
-}
decode : Decoder Geometry
decode =
  object5 Geometry
    (DOM.childNode 1 (DOM.childNode 0 (DOM.childNode 0 element)))
    (DOM.childNode 1 (DOM.childNode 0 (DOM.childNode 1 element)))
    (DOM.childNode 1 (DOM.childNode 0 (DOM.childNode 1 (DOM.childNode 1 element))))
    (DOM.childNode 1 (DOM.childNode 0 (DOM.childNode 1 (DOM.childNode 1 (DOM.childNodes DOM.offsetTop)))) |> map Array.fromList)
    (DOM.childNode 1 (DOM.childNode 0 (DOM.childNode 1 (DOM.childNode 1 (DOM.childNodes DOM.offsetHeight)))) |> map Array.fromList)


decodeAsTextfield =
  DOM.target <| DOM.parentElement <| DOM.parentElement <| DOM.parentElement decode


decodeAsMenuItem =
  DOM.target <| DOM.parentElement <| DOM.parentElement <| DOM.parentElement <| DOM.parentElement <| DOM.parentElement decode


decodeAsMenuButton =
  DOM.target <| DOM.parentElement <| DOM.parentElement <| DOM.parentElement decode


-- ELEMENT


type alias Element =
  { offsetTop : Float
  , offsetLeft : Float
  , offsetHeight : Float
  , bounds : DOM.Rectangle
  }


defaultElement =
  { offsetTop = 0
  , offsetLeft = 0
  , offsetHeight = 0
  , bounds =
    { top = 0
    , left = 0
    , width = 0
    , height = 0
    }
  }


{-| Decode an Element
-}
element : Decoder Element
element =
  object4 Element
    DOM.offsetTop
    DOM.offsetLeft
    DOM.offsetHeight
    DOM.boundingClientRect
