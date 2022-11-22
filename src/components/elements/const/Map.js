import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 36.2048,
    lng: 138.2529
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDTx3rvRsbCwYKmlTyDg1KFbvqcRFi4CF4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            { props.locations.map((item) => (
                <Marker key={item.name} position={item.location} onClick={(e) => props.onClickMark(e, 1)}/>
                ))
            }
            <></>
        </GoogleMap>
  ) : <></>
}

export default React.memo(Map)