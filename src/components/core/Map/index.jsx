const Map = () => (
  <iframe
    width="100%"
    frameborder="0"
    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_MAPS_API_KEY}&q=azur+marketing,Bulle+Suisse`} allowfullscreen>
  </iframe>
)

export default Map
