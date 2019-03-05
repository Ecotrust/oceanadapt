export function render() {
  // Render the page
  document.getElementById('map-overlay').innerHTML = `
  <h1>About Us</h1>
  <p>OceanAdapt is a collaboration between the Pinsky Lab of Rutgers University and the National Marine Fisheries Service (NMFS) to provide information about the impacts of changing climate and other factors on the distribution of marine life to the National Climate Assessment, fisheries communities, policymakers, and to others. This website hosts an annually updated database of scientific surveys in the United States and provides tools for exploring changes in marine fish and invertebrate distributions. We are continually working to expand the site with new data and visualization tools.</p>

  <hr />

  <h3>Our Method</h3>
  <p>The distributions of fish and invertebrate populations are routinely monitored by NMFS and other agencies during bottom trawl surveys on the continental shelves of North America. These surveys provide core information for use in fisheries management and extend back two to five decades. For the indicators displayed on this website, a mean location (the centroid) is calculated for each species in each year of each survey, after the surveys have been standardized to a consistent spatial footprint through time. The centroid is the mean latitude and mean depth of catch in the survey, weighted by biomass. </p>
  <p>For the regional and national indices, the first year is standardized to a value of zero and changes are then averaged across species in a region. Only regions with consistent survey methods and without coastlines that would prevent poleward shifts in distribution are included in the national average (currently Eastern Bering Sea and Northeast U.S. Spring). Only species caught every year are analyzed to prevent changes in species composition from affecting the indicator. The indicator begins in the first year that data are available from the focal regions. </p>
  <p>The historical analyses and data are described in Pinsky, M. L., B. Worm, M. J. Fogarty, J. L. Sarmiento, and S. A. Levin. 2013. Marine taxa track local climate velocities. Science 341: 1239-1242 doi: <a href="http://doi.org/10.1126/science.1239352" target="_blank">10.1126/science.1239352</a> (free reprint available from <a href="http://pinsky.marine.rutgers.edu/publications/" target="_blank">pinsky.marine.rutgers.edu/publications</a>).</p>
  <p>The projections of future species distributions were developed from statistical relationships between ocean temperature, bottom habitat features, and species abundance. Ocean temperature projections for the future were from global climate models developed for the <a href="https://www.ipcc.ch/" target="_blank">Intergovernmental Panel on Climate Change</a>. Full methods are described in Morley, J. W., R. L. Selden, R. J. Latour, T. L. Frölicher, R. J. Seagraves, and M. L. Pinsky. 2018. Projecting shifts in thermal habitat for 686 species on the North American continental shelf. PLOS ONE 13(5): e0196127 doi: <a href="http://doi.org/10.1371/journal.pone.0196127" target="_blank">10.1371/journal.pone.0196127</a> (open access).</p>
  <p><strong>Data contributors to this website include:</strong></p>

  <ul>
    <li><a href="http://www.nefsc.noaa.gov/femad/ecosurvey/mainpage/" >NOAA Northeast Fisheries Science Center Spring and Fall Bottom Trawl Surveys</a></li>
    <li><a href="http://www.nwfsc.noaa.gov/research/divisions/fram/groundfish/bottom_trawl.cfm" >NOAA Northwest Fisheries Science Center U.S. West Coast Groundfish Bottom Trawl Survey</a></li>
    <li><a href="http://www.afsc.noaa.gov/RACE/groundfish/default.php" >NOAA Alaska Fisheries Science Center Groundfish Assessment Program surveys</a></li>
    <li><a href="http://www.gsmfc.org/seamap.html" >Gulf States Marine Fisheries Commission SEAMAP Groundfish Surveys</a></li> <!-- http://seamap.gsmfc.org/ -->
    <li><a href="http://www.seamap.org/" >Southeast Area Monitoring and Assessment Program - South Atlantic</a></li>
  </ul>

    <p>Note that the script for these calculations is also available (written for <a href="http://www.r-project.org" >R</a>). Development version of the script available on <a href="https://github.com/mpinsky/OceanAdapt">GitHub</a>. </p>

  <hr />

  <h3 id="fairusepolicy">Our Data Policy</h3>
  <p>All of the data underlying these analyses are available for download, including spatially georeferenced catches from more than fifty thousand bottom trawl tows in six regions of the U.S. Please notify us through the online form when you download the data, as this helps us justify maintaining the database as a community resource. </p>

  <p><strong>As part of our Fair Use Policy, please:</strong></p>

  <ul>
    <li>Notify us if you are preparing a manuscript using information from the OceanAdapt database (also helps justify funding). </li>
    <li>Coordinate your research efforts with others using the database by joining existing papers where efforts overlap (contact us if you want to check on potential overlap). </li>
    <li>If the database is particularly crucial to your research, please consider offering database developers and their colleagues an opportunity to become involved as co-authors.</li>
  </ul>

  <p>In primary publications using data from the database, please cite Pinsky et al. 2013. Marine taxa track local climate velocities. Science 341: 1239-1242 doi: 10.1126/science.1239352, as well as the original data sources.</p>

  <hr />

  <h3>Related Resources</h3>

  <dl>
    <dt>Government agencies</dt>
    <dd>* <a target="_blank" href="http://www.nmfs.noaa.gov/" >National Marine Fisheries Service</a> </dd>
    <dd>* <a target="_blank" href="http://www.globalchange.gov" >US Global Change Research Program</a> </dd>
  </dl>
  <dl>
    <dt>Climate, fish, and fisheries</dt>
    <dd>* <a target="_blank" href="http://www.globalchange.gov" >National Climate Assessment</a></dd>
      <dd>* <a target="_blank" href="http://www.nefsc.noaa.gov/ecosys/climate_change/index.html" >Northeast Fisheries Science Center: Climate Change</a> </dd>
      <dd>* <a target="_blank" href="http://www.fisheries.noaa.gov/stories/2014/03/climate_portal.html" >NOAA Climate, Fisheries, and Protected Resources</a> </dd>
      <dd>* <a target="_blank" href="http://www.nereusprogram.org/" >Nereus Program</a> </dd>
      <dd>* <a target="_blank" href="http://ocean.ices.dk/iroc/" >ICES Report on Ocean Climate</a> </dd>
  </dl>
  <dl>
    <dt>Marine climate data</dt>
    <dd>* <a target="_blank" href="http://www.esrl.noaa.gov/psd/ipcc/ocn/" >Ocean Climate Change Web Portal</a> </dd>
      <dd>* <a target="_blank" href="http://ocean.ices.dk/iroc/" >ICES Report on Ocean Climate</a> </dd>

  </dl>
  <dl>
    <dt>Fish and fisheries data</dt>
    <dd>* <a target="_blank" href="http://ramlegacy.org" >RAM Legacy Database</a> </dd>
      <dd>* <a target="_blank" href="http://www.seaaroundus.org/" >Sea Around Us Project</a> </dd>
      <dd>* <a target="_blank" href="http://www.fishbase.org" >Fishbase</a> </dd>
      <dd>* <a target="_blank" href="http://sealifebase.org" >Sealifebase</a> </dd>

  </dl>`
}
