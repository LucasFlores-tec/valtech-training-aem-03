package com.aem.training.core.models;

import com.adobe.cq.export.json.ComponentExporter;

public interface SubscribeFormModel extends ComponentExporter {

    String getTitle();
    String getLabel();
    String getAuthorization();

}
