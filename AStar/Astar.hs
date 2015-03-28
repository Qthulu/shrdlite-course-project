import Data.Map (Map)
import qualified Data.Map as Map


data Node = N {
    name :: String
  , neighbour :: [Node]
}
type Fn = Integer
data PriorityQ = PQ {
    q :: [(Node, Fn)]
}

type Distance = Integer
data Graph = G {
    graph :: Map Node [(Node, Distance)]
}

heuristic :: Node -> Node -> Fn 
heuristic = \f t -> 0 -- Djisktra
