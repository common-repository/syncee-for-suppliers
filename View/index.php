<?php
?>


<html lang="en">
<header>
    <style>
        .syncee-logo-supplier {
            width: 300pt;
        }

        /*.syncee-logo-Supplier {*/
        /*    width: 200pt;*/
        /*    margin: 25px;*/

        /*}*/

        .syncee-table-Supplier {
            border-collapse: collapse;
        }

        .syncee-td, .syncee-th {
            border: 1px solid #999;
            padding: 0.5rem;
            text-align: left;
        }

        .syncee-body {

        }

        .syncee-button-Supplier {
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            background-color: transparent;
            border: 0 solid transparent;
            border-radius: 100px;
            font-size: 14px;
            padding: 0 36px;
            min-height: 36px;
        }

        .syncee-button-secondary-Supplier {
            color: #fff;
            background-color: #0d6efd;
            /*border-color: #0d6efd;*/
        }

        .syncee-button-warning-Supplier {
            color: #EF5350;
            background-color: #FFCDD2;
            /*border-color: #FFCDD2;*/
        }

        #registerToWoocommerceSupplier, #registerToSynceeSupplier, #openSynceeSupplier {
            display: none;
        }

    </style>
</header>

<body>

<div class="syncee-logo-container">
    <img src="" alt="syncee logo" class="syncee-logo-supplier" id="syncee-logo-supplier">
</div>
<div id="requirementsTable"></div>

<div class="containerSupplier">
    <div class="row">


        <div id="registerToWoocommerceSupplier">
            <h2>Sign up Syncee to Woocommerce</h2>
            <p>You have to allow Woocommerce access for Syncee.</p>
            <button id="registerToWoocommerceButtonSupplier"
                    class="syncee-button-secondary-Supplier syncee-button-Supplier">Sign up Syncee to
                Woocommerce
            </button>
            <br>
            <br>
        </div>


        <div id="registerToSynceeSupplier">
            <h2>Sign up to Syncee</h2>
            <p>You have to sign up to the Syncee.</p>
            <button id="registerToSynceeButtonSupplier" class="syncee-button-secondary-Supplier syncee-button-Supplier">
                Register to Syncee
            </button>
            <br>
            <br>
        </div>


        <div id="openSynceeSupplier">
            <p>Your store has been successfully connected to your Syncee account.</p>
            <button id="openSynceeButtonSupplier" class="syncee-button-secondary-Supplier syncee-button-Supplier">Go to
                Syncee
            </button>
            <button id="uninstallEcomButtonSupplier" class="syncee-button-warning-Supplier syncee-button-Supplier">
                Disconnect from Syncee
            </button>
            <br>
            <br>
        </div>


        <div id="refresh">
            <button id="refreshButtonSupplier" class="syncee-button-Supplier">Refresh</button>
        </div>


        <div id="support-team-Supplier">
            <br>
            <p>If you have any questions or need assistance, contact the Syncee team at support@syncee.co</p>
            <br>

        </div>
        <div>
            <a target="_blank"
               href="https://help.syncee.co/en/articles/5074038-how-to-install-syncee-to-your-wordpress-store-woocommerce-integration"
               class="syncee-button-Supplier">Integration</a>
            <a target="_blank" href="https://help.syncee.co/en/articles/6294863-woocommerce-system-requirements"
               class="syncee-button-Supplier">Requirements</a>
        </div>
    </div>
</div>
</body>
</html>
