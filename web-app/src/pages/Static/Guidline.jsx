import React from 'react';
import { Callout } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default function Guidline() {
  React.useEffect(() => {
    document.title = 'Guidline | Coinlen';
  }, []);

  return (
    <React.Fragment>
      <Grid fluid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <div style={{ marginTop: 10 }}>
              <h4>INFORMATION</h4>
              <p>Please read the entire document. The information you need to know to use Conilen is detailed below.</p>
              
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut exercitationem aperiam voluptatem at aliquid iste dolore enim molestias repudiandae, asperiores repellat hic rem id recusandae, in, quod mollitia ullam sint.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio vero dolores illo, cupiditate nulla ipsum odit eaque est ex qui quasi veritatis consequuntur. Quasi aut commodi in. Voluptas, odit perspiciatis.
              </p>

              <h4>DEFINITIONS</h4>
              <ul>
                <li>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem doloremque nihil ex ipsa sunt inventore repellat debitis hic impedit consectetur veniam, error itaque labore. Eos tenetur obcaecati dolorum minima eaque?
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta perferendis in assumenda quibusdam at sint facere explicabo eaque corrupti ipsa praesentium, consequatur ducimus? Aut, nam! Nostrum perferendis optio voluptas doloremque?
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa officia tempore soluta blanditiis facere libero cupiditate reiciendis similique fugiat, pariatur fugit at iure distinctio cumque nostrum quaerat enim magnam officiis?
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto vel quas nostrum. Beatae atque aperiam modi suscipit repellat facere velit rerum sunt dolor repudiandae ea quibusdam itaque, magni veritatis exercitationem.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aut consectetur enim quas porro dolor. Ad eaque numquam, quia possimus nostrum nulla culpa et soluta. Asperiores quas rem quam quo?
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita cum recusandae neque vel dolorum autem doloribus, veritatis velit totam reiciendis accusantium officia iusto. Neque nemo sunt cupiditate consequatur modi mollitia!
                </li>
              </ul>

              <h4>RESOURCES</h4>
              <ul>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quo similique minus consectetur omnis, molestias alias? Voluptate eos quasi voluptatibus suscipit illum tempore maiores? Minima quos nesciunt asperiores unde officiis.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam odit expedita corrupti numquam error itaque consequuntur nostrum odio saepe eos qui quisquam, ratione laboriosam quia iure vel, sint asperiores.
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut ducimus ab non repellendus harum vitae accusantium voluptatum reiciendis adipisci nostrum nesciunt, cupiditate inventore quidem natus, libero blanditiis minus placeat ex.
                </li>
              </ul>

              <h4>TIPS</h4>
              <ol>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et perspiciatis odio unde fugit quidem ipsam inventore laudantium saepe delectus blanditiis provident, hic ex totam veritatis? Odit nesciunt quisquam repellendus autem?
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum consequatur facilis ab, temporibus iste aperiam nulla dicta quasi nihil magnam consequuntur aut itaque perspiciatis quo quod, repellat assumenda vel corrupti.
                </li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam dignissimos voluptas, qui, libero nobis atque voluptatem iste facere dolore corrupti debitis quis veniam sapiente illum, culpa unde laudantium reprehenderit eius!
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum ratione ullam tenetur assumenda enim delectus ex reprehenderit temporibus hic voluptas necessitatibus iusto, consectetur ut et magnam officia. Qui, fugiat quisquam!
                </li>
              </ol>

              <Callout>
                Binance, BtcTurk and Paribu values are updated instantly.
              </Callout>
              <br /> 
              <a rel="noopener noreferrer" href="https://t.me/joinchat/XXXX" target="_blank">Join the Telegram Opportunity Group!</a> 
            </div>
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
}
