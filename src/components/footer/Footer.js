import React from "react"
import { Container } from "semantic-ui-react"
import "./Footer.css"

const Footer = props => {
  return (
    <div className="footer">
      <Container text>
        {/*TODO: Footer text is partially ripped off Fate SRD. */}
        <p>
          <small>
              This site is ©2020 Keith R. Potempa, except where otherwise noted.
          </small>
        </p>
          {/*It is only possible because of the generous nature of Evil Hat Productions, LLC, who, in their wisdom, opened up the system to improve the Fate RPG ecosystem. Give them monies.*/}
        <p>
          <small>
            This site is not affiliated with <a rel="noopener noreferrer" target="_blank" href="https://www.evilhat.com/home/">Evil Hat Productions, LLC</a>.
          </small>
        </p>
        <p>
          <small>
            This work is based on <a rel="noopener noreferrer" target="_blank" href="http://www.faterpg.com/">Fate Core System</a>, products of Evil Hat Productions, LLC, developed, authored, and edited by Leonard Balsera, Brian Engard, Jeremy Keller, Ryan Macklin, Mike Olson, Clark Valentine, Amanda Valentine, Fred Hicks, and Rob Donoghue, and licensed for our use under the <a rel="noopener noreferrer" target="_blank" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported license</a>.
          </small>
        </p>
        {/* TODO: Ask permission */}
        <p>
          <small>
            Fate™ is a trademark of Evil Hat Productions, LLC. The Powered by Fate logo is © Evil Hat Productions, LLC and is used with permission.
          </small>
        </p>
        {/* TODO: Ask permission */}
        <p>
          <small>
            The Fate Core font is © Evil Hat Productions, LLC and is used with permission. The Four Actions icons were designed by Jeremy Keller.
          </small>
        </p>
      </Container>    
    </div>
  )
}

export default Footer