<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$events = array(
  '11' => array(
    'title' => 'The Hague is doing well on Meetup!',
    'subTitle' => 'Blockbar'
  ),
  '15' => array(
    'title' => 'Blockchain Monthly Update',
    'subTitle' => 'Blockbar'
  ),
  '17' => array(
    'title' => 'Business Development in Tech',
    'subTitle' => 'Vierde vrijdag'
  ),
  '18' => array(
    'title' => 'Privacy 101',
    'subTitle' => 'Vierde vrijdag'
  ),
  '19' => array(
    'title' => 'Cyber Security',
    'subTitle' => 'Vierde vrijdag'
  ),
  '20' => array(
    'title' => 'Food, drinks & networking',
    'subTitle' => 'Vierde vrijdag'
  )
);

?>
<div class="UpcomingSessions">

  <h2>Upcoming sessions</h2>

  <div class="UpcomingSessions-grouped">

    <?php for($i = 6; $i <= 24; $i++) { ?>
      <div class="UpcomingSessions-hour-block <?php echo (isset($events[$i]) ? 'active' : ''); ?>" data-hour="<?php echo $i; ?>">
        <div class="UpcomingSessions-hour"><?php echo $i; ?></div>
        <div class="UpcomingSessions-info">
          <div class="UpcomingSessions-info-title">
            <?php echo (isset($events[$i]) && $events[$i]['title'] ? $events[$i]['title'] : ''); ?>
          </div>
          <div class="UpcomingSessions-info-subTitle">
            <?php echo (isset($events[$i]) && $events[$i]['subTitle'] ? $events[$i]['subTitle'] : ''); ?>
          </div>
        </div>
      </div>
    <?php } ?>

  </div>

</div>

<style type="text/css">
  
.UpcomingSessions {
}

.UpcomingSessions-grouped {
  height: 100%;
  background: #0fd9a3;
  padding: 5px;
}

.UpcomingSessions-hour-block {
  background: #eee;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
}
.UpcomingSessions-hour-block.active {
  background-color: #0fd9a3;
}
.UpcomingSessions-hour-block.active:hover {
  background-color: #ff0;
}

.UpcomingSessions-hour {
  width: 30px;
  text-align: left;
}

.UpcomingSessions-info {
  flex: 1;
  text-align: left;
}

.UpcomingSessions-info-title {
  font-weight: bold;
  font-size: 1.5em;
}

.UpcomingSessions-info-subTitle {
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
}

.UpcomingSessions-hour-block.active:hover .UpcomingSessions-info-subTitle {
  color: #000;
}

</style>