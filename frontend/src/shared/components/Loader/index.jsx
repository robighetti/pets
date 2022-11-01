import { FidgetSpinner } from "react-loader-spinner"

import { Container } from "./styles"

export const Loader = () => {
  return (
    <Container>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#e745bf"
      />
    </Container>
  )
}