<?php

class block_messageteacher extends block_base {
    function init() {
        $this->title = get_string('pluginname', 'block_messageteacher');
    }

    function get_content() {
        global $COURSE, $CFG, $USER, $DB;

        $this->content->text = '';
        $this->content->footer = '';

        $roles = explode(',', $CFG->block_messageteacher_roles);        
        list($usql, $params) = $DB->get_in_or_equal($roles);
        $params = array_merge(array($COURSE->id, $USER->id), $params);
        $select = 'SELECT userid ';
        $from = 'FROM {role_assignments}
                  JOIN {context} AS c ON contextid = c.id AND contextlevel= 50 ';
        $where = 'WHERE c.instanceid = ? AND userid <> ? AND roleid '.$usql;

        if ($teachers = $DB->get_records_sql($select.$from.$where, $params)) {
            foreach ($teachers as $teacherid) {
                $teacher = $DB->get_record('user', array('id' => $teacherid->userid));
                $url = new moodle_url('/message/discussion.php', array('id' => $teacher->id));
                $this->content->text .= html_writer::tag('a', $teacher->firstname.' '.$teacher->lastname, array('href' => $url->out()));
            }
        }
        return $this->content;
    }
}

?>