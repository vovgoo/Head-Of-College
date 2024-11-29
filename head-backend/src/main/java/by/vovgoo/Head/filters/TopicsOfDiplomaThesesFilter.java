package by.vovgoo.Head.filters;

import by.vovgoo.Head.filters.enums.TopicSorts;

public record TopicsOfDiplomaThesesFilter(String description, Integer yearMin, Integer yearMax, TopicSorts topicSorts) {

}
