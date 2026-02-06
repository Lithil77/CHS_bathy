<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1.0" xmlns:ogc="http://www.opengis.net/ogc">
  <NamedLayer>
    <se:Name>obstrn</se:Name>
    <UserStyle>
      <se:Name>obstrn</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>OBSTRN</se:Name>
          <se:Description>
            <se:Title>OBSTRN</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>obj</ogc:PropertyName>
              <ogc:Literal>OBSTRN</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:Mark>
                <se:OnlineResource xlink:href="ttf://CARIS Nautical 3" xlink:type="simple"/>
                <se:Format>ttf</se:Format>
                <se:MarkIndex>143</se:MarkIndex>
                <se:Fill>
                  <se:SvgParameter name="fill">#000000</se:SvgParameter>
                </se:Fill>
              </se:Mark>
              <se:Size>36</se:Size>
              <se:Displacement>
                <se:DisplacementX>0</se:DisplacementX>
                <se:DisplacementY>-3</se:DisplacementY>
              </se:Displacement>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>UWTROC</se:Name>
          <se:Description>
            <se:Title>UWTROC</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>obj</ogc:PropertyName>
              <ogc:Literal>UWTROC</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:Mark>
                <se:OnlineResource xlink:href="ttf://CARIS Nautical 3" xlink:type="simple"/>
                <se:Format>ttf</se:Format>
                <se:MarkIndex>125</se:MarkIndex>
                <se:Fill>
                  <se:SvgParameter name="fill">#232323</se:SvgParameter>
                </se:Fill>
              </se:Mark>
              <se:Size>36</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
